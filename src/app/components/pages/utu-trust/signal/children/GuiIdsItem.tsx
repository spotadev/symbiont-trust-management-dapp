import { useNavigate } from "react-router-dom";
import { IdsItem, Proof } from "../../../../../services/next-id/nextIdCheckAvatarService";
import GuiProof from "../../../../shared/children/GuiProof";
import { useDispatch, useSelector } from "react-redux";
import { utu_updateSelectedIdsItem, utu_updateUtuToken } from "../../../../../store/slices/utuSlice";
import { RootState } from "../../../../../store/store";

// @ts-ignore
import { addressSignatureVerification, AuthData } from "@ututrust/web-components";
import { idHelper } from "../../../../../helpers/id-helper/IdHelper";

export default function GuiIdsItem(props: any) {

  const utuAppApiBaseUrl = import.meta.env.VITE_APP_UTU_API_BASE_URL;
  console.log('utuAppApiBaseUrl', utuAppApiBaseUrl);


  // hooks below -----------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // readonly values from redux below --------------------------------------------------------------
  const utuToken = useSelector((state: RootState) => state.utu.utuToken);

  const idsItem: IdsItem = props.idsItem;
  const index = props.index;
  const proofs: Proof[] = idsItem.proofs;


  const giveSignal = (idsItem: IdsItem) => {
    dispatch(utu_updateSelectedIdsItem(idsItem));
    navigate('/utu-trust/give-signal')
  }

  const getSignal = (idsItem: IdsItem) => {
    dispatch(utu_updateSelectedIdsItem(idsItem));
    navigate('/utu-trust/get-signal')
  }

  const triggerUtuIdentityDataSDKEvent = (
    identityData: AuthData
  ): void => {
    const event = new CustomEvent("utuIdentityDataReady", {
      detail: identityData,
    });
    window.dispatchEvent(event);
  };

  const initEntity = async (data: AuthData) => {
    await fetch(utuAppApiBaseUrl + "/core-api-v2/entity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.access_token}`,
      },
      body: JSON.stringify({
        name: idsItem.avatar,
        type: "provider",
        ids: {
          uuid: idHelper.getId(idsItem.avatar)
        },
        // image:
        //  "https://i0.wp.com/utu.io/wp-content/uploads/job-manager-uploads/company_logo/2020/12/cropped-UTU-LG-FV.png?fit=192%2C192&ssl=1",
      }),
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const utuLogin = async () => {
    let authDataResponse: AuthData = await addressSignatureVerification();
    let _utuToken = authDataResponse.access_token;
    dispatch(utu_updateUtuToken(_utuToken));
    initEntity(authDataResponse);
    triggerUtuIdentityDataSDKEvent(authDataResponse);
  }

  const getButtonsJSX = () => {
    if (!utuToken) {
      return (
        <div style={{ paddingTop: '20px' }}>
          You need to login to UTU before getting or giving signal:
          <div style={{ paddingTop: '20px' }}>
            <button onClick={() => { utuLogin() }}>Login to UTU</button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div style={{ paddingTop: '20px' }}>
          <button onClick={() => { giveSignal(idsItem) }}>Give UTU Signal</button>
          &nbsp;&nbsp;
          <button onClick={() => { getSignal(idsItem) }}>Get UTU Signal</button>
        </div>
      );
    }
  }

  if (idsItem) {
    return (
      <div style={{
        padding: '20px',
        borderColor: 'white',
        borderWidth: '1px',
        borderStyle: 'solid',
        backgroundColor: index % 2 === 0 ? 'black' : 'brickred'
      }}>
        <div style={{ fontWeight: 'bold' }}>
          <span>next.id DID:</span>
        </div>
        <div style={{ wordWrap: 'break-word' }}>
          {idsItem?.avatar}
        </div>
        {
          proofs.map((proof, index) => (
            <div key={proof.identity} style={{ paddingTop: '20px' }}>
              <GuiProof proof={proof} index={index} />
            </div>
          ))
        }
        {getButtonsJSX()}
      </div>
    );
  }
  return null;
}