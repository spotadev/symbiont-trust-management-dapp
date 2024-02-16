import React, { useState } from 'react';
import appStyle from '../../../../../../App.module.css';
import { signMessage } from '@wagmi/core';
import { hashMessage, recoverPublicKey } from 'viem';
import { ec as EC } from 'elliptic';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { nextIdVerifyService } from '../../../../../services/next-id/nextIdVerifyService';
import { nextIdManagement_updateGithubProofVerified } from '../../../../../store/slices/nextIdManagementSlice';
import ProofPayloadResponse, { nextIdProofService } from '../../../../../services/next-id/nextIdProofService';
import { githubHandle_updateGistId, githubHandle_updateGithubProofPayloadResponse } from '../../../../../store/slices/githubHandleSlice';
import { wagmiConfig } from "../../../../../../App";

export default function ShowGistInfo() {

  // hooks below -----------------------------------------------------------------------------------
  // this dispatch method is used for updating values in the slices of the redux store 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // readonly values from redux below --------------------------------------------------------------
  const githubHandle = useSelector((state: RootState) => state.githubHandle.githubHandle);
  const githubProofVerified = useSelector((state: RootState) => state.nextIdManagement.githubProofVerified);

  const githubProofPayloadResponse =
    useSelector((state: RootState) => state.githubHandle.githubProofPayloadResponse);

  const publicKey =
    useSelector((state: RootState) => state.githubHandle.publicKey);

  const gistFileName =
    useSelector((state: RootState) => state.githubHandle.gistFileName);

  const gistFileContent =
    useSelector((state: RootState) => state.githubHandle.gistFileContent);

  const gistId =
    useSelector((state: RootState) => state.githubHandle.gistId);

  // useState values -------------------------------------------------------------------------------
  const [gistUrl, setGistUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigateToHome = () => {
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  // https://gist.github.com/javaspeak/395d0bfad840c1ce78f6def3f835226b
  const getGistIdFromGistUrl = (gistUrl: string) => {
    const pathParts = gistUrl.split("/");

    if (pathParts.length == 0) {
      return null;
    }

    let hash = pathParts[pathParts.length - 1];
    return hash;
  }

  const isValidGistUrl = (gistUrl: string) => {
    const trimmed = gistUrl.trim();
    if (!trimmed.startsWith('https://gist.github.com')) {
      return false;
    }

    const gistId = getGistIdFromGistUrl(trimmed);

    if (!gistId) {
      return false;
    }

    if (gistId.length != 32) {
      return false;
    }
  }

  const verify = async () => {
    if (gistUrl) {
      if (!isValidGistUrl(gistUrl)) {
        setErrorMessage(
          'Please type a valid Gist URL. It looks something like:' +
          'https://gist.github.com/javaspeak/395d0bfad840c1ce78f6def3f835226b'
        );
      }

      const gistId = getGistIdFromGistUrl(gistUrl);

      if (!githubProofPayloadResponse || !githubHandle || !publicKey || !gistId) {
        const errrorMessage =
          'Expecting all of these to be populated: ' +
          `proofPayloadResponse: ${githubProofPayloadResponse}, ` +
          `githubHandle: ${githubHandle}, publicKey: ${publicKey}, gistId: ${gistId}`;

        throw new Error(errrorMessage);
      }

      const uuid = githubProofPayloadResponse?.uuid;
      const createdAt = githubProofPayloadResponse.created_at;

      try {
        await nextIdVerifyService.verifyGithubProof(githubHandle, publicKey, gistId, uuid, createdAt);
        dispatch(nextIdManagement_updateGithubProofVerified(true));
      }
      catch (error) {
        dispatch(nextIdManagement_updateGithubProofVerified(false));
        setErrorMessage(
          'The gist did not pass validation. The github handle was not added to your next.id DID');
      }
    }
  }

  const getShowGistInfoJSX = () => {
    return (
      <div>
        <hr />
        <span style={{ fontWeight: 'bold' }}>Step 2: </span>
        Create a gist repository and add file - PENDING
        <div style={{ paddingTop: '20px' }}>
          Github has a cut down version of Github repositories called Gist Repositories.
        </div>
        <div style={{ paddingTop: '20px' }}>
          See here for further information about Gist Repositories:
          <br /><br />
          <a href="https://www.youtube.com/watch?v=xl004KsPKGE" target="_new">Youtube: What is GitHub Gist? Let's learn!</a>
          <br /><br />
          <a href="https://gist.github.com/" target="_new">https://gist.github.com/</a>
        </div>
        <div>
          <p style={{ fontWeight: 'bold', paddingTop: '20px' }}>
            <h3>Copy / Paste Details:</h3>
          </p>
          <div>
            Gist Filename:
          </div>
          <div style={{ marginTop: '20px', backgroundColor: 'lightgreen', wordWrap: 'break-word', padding: '10px' }}>
            <pre>
              {gistFileName}
            </pre>
          </div>
          <div style={{ paddingTop: '20px' }}>
            Gist File Content:
          </div>
          <div style={{ marginTop: '20px', backgroundColor: 'lightgreen', wordWrap: 'break-word', padding: '10px' }}>
            <pre style={{ tabSize: '2', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
              {gistFileContent}
            </pre>
          </div>
        </div>
        <div>
          Login to github.  Then got to gist.github.com and click the + to add a new gist.
          <br /><br />
          In the "gist description box" type something like: "next.id validaion"
          <br /><br />
          In the "filename including extension box" copy the gist filename from above.
          <br /><br />
          In the content box paste the gist content from above.
          <br /><br />
          Select the "Create Public Gist" option when creating the gist.
          <br /><br />
          Once you have created the gist you will see a hash in the url of the gist.
          Copy that hash into "Gist hash" box below and press the Verify button.  You will be
          told if the github handle was successfully added to the DID or not.
        </div>
        <div style={{ paddingTop: '20px' }}>
          <input
            style={{ width: '250px' }}
            className={appStyle.input}
            placeholder="Gist Hash"
            value={gistUrl}
            onChange={(event) => setGistUrl(event.target.value)} />
          &nbsp;&nbsp;
          <button className={appStyle.button} disabled={githubHandle?.length == 0}
            onClick={verify}>Verify</button>
        </div>
      </div>

    );
  }

  if (githubProofPayloadResponse && !githubProofVerified) {
    return getShowGistInfoJSX();
  }
  else if (githubProofVerified) {
    return (
      <>
        <span style={{ fontWeight: 'bold' }}>Step 2: </span>
        Create a gist repository and add file - Handle added successfully to next.id DID
        <br /><br />
        .... Redirecting to &nbps;
        <Link to={'/next-id-management'}>
          <span className={appStyle.link}>
            Avatar Management
          </span>
        </Link>
        &nbps;
        page in 4 seconds where you will see your DID.
      </>
    );
  }
  else return '';

}