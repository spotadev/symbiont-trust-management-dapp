import React from 'react'
import appStyle from '../../../../../../App.module.css';
import ProofPayloadResponse, { nextIdProofService } from '../../../../../services/next-id/nextIdProofService';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

import {
  githubHandle_updateGithubProofPayloadResponse,
  githubHandle_updatePublicKey,
  githubHandle_updateGithubHandle,
  githubHandle_updateGistFileContent,
  githubHandle_updateGistFileName
} from '../../../../../store/slices/githubHandleSlice';
import { useAccount } from 'wagmi';
import { hashMessage, recoverPublicKey } from 'viem';
import { wagmiConfig } from "../../../../../../App";
import { signMessage } from '@wagmi/core'
import { ec as EC } from 'elliptic';

export default function CaptureXHandle() {

  // hooks below -----------------------------------------------------------------------------------
  // this dispatch method is used for updating values in the slices of the redux store 
  const dispatch = useDispatch();

  const { address, isConnected } = useAccount();

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
      const proofPayloadResponse = response.proofPayloadResponse;

      console.log('proofPayloadResponse', response.proofPayloadResponse);
      const postContent = proofPayloadResponse.post_content;
      console.log('postContent', postContent);
      let _default: string = postContent.default;
      console.log('_default', _default);

      const message = proofPayloadResponse.sign_payload;
      const hexSignature = await signMessage(wagmiConfig, { message: message });
      const messageHash = hashMessage(message);

      const uncompressedRecoveredPublicKey = await recoverPublicKey({
        hash: messageHash,
        signature: hexSignature
      })

      const base64Signature = Buffer.from(hexSignature.slice(2), 'hex').toString('base64');
      _default = _default.replace('%SIG_BASE64%', base64Signature);
      dispatch(githubHandle_updateGistFileContent(_default));

      console.log('message', message);
      console.log('hexSignature', hexSignature);
      console.log('messageHash', messageHash);
      console.log('uncompressedRecoveredPublicKey', uncompressedRecoveredPublicKey);
      const uncompressedRecoveredPublicKeyWithoutPrefix = uncompressedRecoveredPublicKey.slice(2);
      const ec = new EC('secp256k1');
      const pubPoint = ec.keyFromPublic(uncompressedRecoveredPublicKeyWithoutPrefix, 'hex').getPublic();

      // Get the compressed public key as a hex string.
      const compressedPublicKey = pubPoint.encodeCompressed('hex');
      console.log('compressedPublicKey', compressedPublicKey);
      const _gistFileName = '0x' + compressedPublicKey + '.json';
      dispatch(githubHandle_updateGistFileName(_gistFileName));
    }
  }

  const clear = async () => {
    dispatch(githubHandle_updateGithubHandle(null));
    dispatch(githubHandle_updateGithubProofPayloadResponse(null));
  }

  if (!isConnected) {
    return (
      <div style={{ paddingTop: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>Step 1:</span> Enter your Github Handle - PENDING
        <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
          To Proceed please connect your wallet.
        </div>
      </div>
    );
  }
  else if (!githubProofPayloadResponse) {
    return (
      <div style={{ paddingTop: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>Step 1:</span> Enter your Github Handle - PENDING
        &nbsp;&nbsp;
        <input
          className={appStyle.input}
          placeholder="Github Handle (mandatory)"
          value={githubHandle ? githubHandle : ''}
          onChange={(event) => dispatch(githubHandle_updateGithubHandle(event.target.value))} />
        &nbsp;&nbsp;
        <button disabled={!githubHandle || githubHandle?.length == 0}
          className={appStyle.button}
          onClick={next}>
          Next
        </button>
        &nbsp;
        <button disabled={githubHandle?.length == 0} className={appStyle.button}
          onClick={clear}>Clear</button>
      </div>
    );
  }
  else {
    return (
      <>
        <div style={{ paddingTop: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Step 1:</span> Enter your Github Handle - DONE
        </div>
        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <button disabled={githubHandle?.length == 0} className={appStyle.button}
            onClick={clear}>Change Github Handle</button>
        </div>
      </>
    );
  }
}