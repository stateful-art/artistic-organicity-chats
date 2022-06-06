import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import UserContext from "~/lib/UserContext";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import { ethers } from "ethers";
const contract = import("../abis/ERC721FacetABI.json");
import pinataSDK from "@pinata/sdk";

const MinterPage = () => {
//   const router = useRouter();
//   const { user, authLoaded, signOut } = useContext(UserContext);

  //   const {
  //     NEXT_PINATA_API_KEY,
  //     NEXT_PINATA_SECRET_KEY,
  //     NEXT_API_URL,
  //     NEXT_PRIVATE_KEY,
  //     NEXT_PUBLIC_KEY,
  //     NEXT_CONTRACT_ADDRESS,
  //   } = process.env;

  const testPinataAuth = async() => {
//     const authResponse = await axios
//     .get("https://api.pinata.cloud/data/testAuthentication", {
//         headers: {
//            pinata_api_key: process.env.NEXT_PINATA_API_KEY,
//            pinata_secret_api_key: process.env.NEXT_PINATA_SECRET_KEY,
//         },
// });
pinataSDK( {
    pinataApiKey: process.env.NEXT_PINATA_API_KEY,
    pinataSecretApiKey: process.env.NEXT_PINATA_SECRET_KEY
}
     
   
  )
      .testAuthentication()
      .then((result) => {
        //handle successful authentication here
        console.log(result);
      })
      .catch((err) => {
        //handle error here
        console.log(err);
      });
  };
  //   const authResponse = async () => {
  //     await axios.get("https://api.pinata.cloud/data/testAuthentication", {
  //       headers: {
  //         pinata_api_key: process.env.NEXT_PINATA_API_KEY,
  //         pinata_secret_api_key: process.env.NEXT_PINATA_SECRET_KEY,
  //       },
  //     });
  //   };

  useEffect(() => {
    testPinataAuth();
  }, []);

  // Render the channels and messages
  return (
    <div className="relative h-screen">
      <h2>here is minter</h2>
    </div>
  );
};

export default MinterPage;
