import _ from "lodash";
import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { DEFAULT_BRICK } from "../constants/defaults";

const BRIC_COLLECTION = "bricks";

export const useBricks = () => {
  const [brics, setBrics] = useState([DEFAULT_BRICK]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(BRIC_COLLECTION)
      .onSnapshot(snapshot => {
        const newBrics = snapshot.docs.map(bric => ({
          id: bric.id,
          ...bric.data()
        }));
        if (!_.isEqual(newBrics, brics)) setBrics(newBrics);
      });
    return () => unsubscribe();
  }, []);
  return brics;
};

export const addBrick = brick => {
  const enrichedBrick = {
    ...brick,
    submitTime: new Date()
  };

  delete enrichedBrick.id;

  firebase
    .firestore()
    .collection(BRIC_COLLECTION)
    .add(enrichedBrick)
    .then(() => {
      console.log("Brick added !");
      console.log({ enrichedBrick });
    })
    .catch(err => console.error(err));
};
