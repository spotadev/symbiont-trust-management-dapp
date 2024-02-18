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
        <div style={{ paddingTop: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Step 2: </span>
          Create a gist repository and add file - PENDING
        </div>
        <div style={{ paddingTop: '20px' }}>
          Github has a cut down version of Github repositories called Gist Repositories.
        </div >
        <div style={{ paddingTop: '20px' }}>
          See here for further information about Gist Repositories:
          <br /><br />
          <div style={{ paddingLeft: '20px' }}>
            <a href="https://www.youtube.com/watch?v=xl004KsPKGE" target="_new">
              Youtube: What is GitHub Gist? Let's learn!
            </a>
          </div>
          <div style={{ paddingLeft: '20px', paddingTop: '20px' }}>
            <a href="https://gist.github.com/" target="_new">
              https://gist.github.com/
            </a>
          </div>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <p>
            You are now going to create a gist. The details for the gist you need to create
            are shown below.
          </p>
          <div>
            Gist Filename:
          </div>
          <div style={{
            marginTop: '20px',
            borderColor: 'white',
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: 'black',
            wordWrap: 'break-word',
            padding: '10px'
          }}>
            <pre>
              {gistFileName}
            </pre>
          </div>
          <div style={{ paddingTop: '20px' }}>
            Gist File Content:
          </div>
          <div style={{
            marginTop: '20px',
            borderColor: 'white',
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: 'black',
            wordWrap: 'break-word',
            padding: '10px'
          }}>
            <pre style={{ tabSize: '2', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
              {gistFileContent}
            </pre>
          </div>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <span style={{ color: 'lime' }}>Instructions:</span>&nbsp;
          Login to github.  Then go to gist.github.com and click the + on the top right hand corner
          of the webpage to add a new gist.
          <br /><br />
          In the "gist description box" type something like: "next.id validaion"
          <br /><br />
          In the "filename including extension box" copy the gist filename from above.
          <br /><br />
          In the content box paste the gist content from above.
          <br /><br />
          Select the "Create Public Gist" option when creating the gist.
          <br /><br />
          Once you have created the gist copy the url of the gist into the box below and press verify:
        </div>
        <div style={{ paddingTop: '20px' }}>
          <input
            style={{ width: '450px' }}
            className={appStyle.input}
            placeholder="Gist Hash"
            value={gistUrl}
            onChange={(event) => setGistUrl(event.target.value)} />
          &nbsp;&nbsp;
          <button className={appStyle.button} disabled={gistUrl?.length == 0}
            onClick={verify}>Verify</button>
        </div>
      </div >

    );
  }

  if (githubProofPayloadResponse && !githubProofVerified) {
    return getShowGistInfoJSX();
  }
  else if (githubProofVerified) {
    return (
      <div>
        <hr />
        <div style={{ paddingTop: '20px' }}>
          <span style={{ fontWeight: 'bold', paddingTop: '10px' }}>Step 2: </span>
          Create a gist repository and add file - Handle added successfully to next.id DID
        </div>
        <br /><br />
        .... Redirecting to &nbps;
        <Link to={'/next-id-management'}>
          <span className={appStyle.link}>
            Avatar Management
          </span>
        </Link>
        &nbps;
        <div>
          Click
          <Link to={'/next-id-management'}>
            <span className={appStyle.link}>
              Avatar Management
            </span>&nbps;
          </Link>
          to see the list of handles added to your DID including this one.
        </div>
      </div>
    );
  }
  else return '';
}