import React from 'react'
import appStyle from '../../../../../../App.module.css';
import ProofPayloadResponse, { nextIdProofService } from '../../../../../services/next-id/nextIdProofService';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

import {
  githubHandle_updateGithubProofPayloadResponse,
  githubHandle_updatePublicKey,
  githubHandle_updateGithubHandle
} from '../../../../../store/slices/githubHandleSlice';

export default function CaptureXHandle() {

  // hooks below -----------------------------------------------------------------------------------
  // this dispatch method is used for updating values in the slices of the redux store 
  const dispatch = useDispatch();

  // readonly values from redux below --------------------------------------------------------------
  const githubHandle = useSelector((state: RootState) => state.githubHandle.githubHandle);

  const githubProofPayloadResponse =
    useSelector((state: RootState) => state.githubHandle.githubProofPayloadResponse);


  const next = async () => {
    if (githubHandle) {
      const platform = 'github';
      const handle = githubHandle;

      const response: { proofPayloadResponse: ProofPayloadResponse, publicKey: string } =
        await nextIdProofService.getNextIdProofPayload(platform, handle);

      dispatch(githubHandle_updatePublicKey(response.publicKey));
      dispatch(githubHandle_updateGithubProofPayloadResponse(response.proofPayloadResponse));
      console.log('response.proofPayloadResponse', response.proofPayloadResponse);
    }
  }

  const clear = async () => {

  }

  if (!githubProofPayloadResponse) {
    return (
      <div style={{ paddingTop: '20px' }}>
        <span style={{ fontWeight: 'bold' }}>Step 1:</span> Enter your Github Handle - PENDING
        &nbsp;&nbsp;
        <input
          className={appStyle.input}
          placeholder="Github Handle (mandatory)"
          value={githubHandle ? githubHandle : ''}
          onChange={(event) => dispatch(githubHandle_updateGithubHandle(event.target.value))} />
        &nbsp;&nbsp;
        <button disabled={githubHandle?.length == 0} className={appStyle.button}
          onClick={next}>Next</button>
        &nbsp;
        <button disabled={githubHandle?.length == 0} className={appStyle.button}
          onClick={clear}>Clear</button>
      </div>
    );
  }
  else {
    return (
      <div style={{ paddingTop: '20px' }}>
        <span style={{ fontWeight: 'bold' }}>Step 1:</span> Enter your Github Handle - DONE
      </div>
    );
  }
}