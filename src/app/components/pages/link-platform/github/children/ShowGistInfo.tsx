import React, { useState } from 'react';
import appStyle from '../../../../../../App.module.css';
import { signMessage } from '@wagmi/core';
import { hashMessage, recoverPublicKey } from 'viem';
import { ec as EC } from 'elliptic';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { nextIdVerifyService } from '../../../../../services/next-id/nextIdVerifyService';
import { nextIdManagement_updateGithubProofVerified } from '../../../../../store/slices/nextIdManagementSlice';
import ProofPayloadResponse, { nextIdProofService } from '../../../../../services/next-id/nextIdProofService';
import { githubHandle_updateGithubProofPayloadResponse } from '../../../../../store/slices/githubHandleSlice';
import { wagmiConfig } from "../../../../../../App";

export default function ShowGistInfo() {

  // hooks below -----------------------------------------------------------------------------------
  // this dispatch method is used for updating values in the slices of the redux store 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // readonly values from redux below --------------------------------------------------------------
  const githubHandle = useSelector((state: RootState) => state.githubHandle.githubHandle);

  const githubProofPayloadResponse =
    useSelector((state: RootState) => state.githubHandle.githubProofPayloadResponse);

  const publicKey =
    useSelector((state: RootState) => state.githubHandle.publicKey);

  const [gistId, setGistId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigateToHome = () => {
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  const verify = async () => {
    if (gistId) {
      if (!githubProofPayloadResponse || !githubHandle || !publicKey) {
        const errrorMessage =
          'Expecting all of these to be populated: ' +
          `proofPayloadResponse: ${githubProofPayloadResponse}, ` +
          `githubHandle: ${githubHandle}, publicKey: ${publicKey}`;

        throw new Error(errrorMessage);
      }

      const uuid = githubProofPayloadResponse?.uuid;
      const createdAt = githubProofPayloadResponse?.created_at;

      try {
        await nextIdVerifyService.verifyGithubProof(githubHandle, publicKey, gistId, uuid, createdAt);
        dispatch(nextIdManagement_updateGithubProofVerified(true));
        navigateToHome();
      }
      catch (error) {
        dispatch(nextIdManagement_updateGithubProofVerified(false));

        setErrorMessage(
          'the gist did not pass validation. The github handle was not added to your next.id DID');
      }
    }
  }

  const next = async () => {
    if (githubHandle) {
      const response: { proofPayloadResponse: ProofPayloadResponse, publicKey: string } =
        await nextIdProofService.getNextIdProofPayload('github', githubHandle);


    }
  }

  const getShowGistInfoJSX = () => {
    return (
      <div>
        <span style={{ fontWeight: 'bold' }}>Step 2: </span>
        Create Gist File and paste gist link - PENDING
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
        Create Gist File and paste gist link - Handle added successfully to next.id DID
        <br /><br />
        .... Redirecting to home page in 4 seconds where you will see your DID.
      </>
    );
  }
  else return '';

}