import React from 'react'
import appStyle from '../../../../../../App.module.css';
import ProofPayloadResponse, { nextIdProofService } from '../../../../../services/next-id/nextIdProofService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import {
  xHandle_updateGithubProofPayloadResponse,
  xHandle_updateXHandle,
  xHandle_updatePublicKey
} from '../../../../../store/slices/xHandleSlice';

export default function CaptureXHandle() {

  // hooks below -----------------------------------------------------------------------------------
  // this dispatch method is used for updating values in the slices of the redux store 
  const dispatch = useDispatch();

  // readonly values from redux below --------------------------------------------------------------
  const xHandle = useSelector((state: RootState) => state.xHandle.xHandle);
  const publicKey = useSelector((state: RootState) => state.xHandle.publicKey);

  const xProofPayloadResponse =
    useSelector((state: RootState) => state.xHandle.xProofPayloadResponse);

  const next = async () => {
    if (xHandle) {
      const platform = 'twitter';
      const handle = xHandle;

      const response: { proofPayloadResponse: ProofPayloadResponse, publicKey: string } =
        await nextIdProofService.getNextIdProofPayload(platform, handle);

      dispatch(xHandle_updatePublicKey(response.publicKey));
      dispatch(xHandle_updateGithubProofPayloadResponse(response.proofPayloadResponse));
      console.log('response.proofPayloadResponse', response.proofPayloadResponse);
    }
  }

  if (!xProofPayloadResponse) {
    return (
      <div>
        <span style={{ fontWeight: 'bold' }}>Step 1:</span> Enter your X Handle - PENDING
        &nbsp;&nbsp;
        <input
          className={appStyle.input}
          placeholder="X / Twitter Handle (mandatory)"
          value={xHandle ? xHandle : ''} onChange={(event) => dispatch(xHandle_updateXHandle(event.target.value))} />
        &nbsp;&nbsp;
        <button disabled={xHandle?.length == 0} className={appStyle.button} onClick={next}>Next</button>
      </div>
    );
  }
  else {
    return (
      <div>
        <span style={{ fontWeight: 'bold' }}>Step 1:</span> Enter your X Handle - DONE
      </div>
    );
  }
}