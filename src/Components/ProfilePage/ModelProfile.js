import { db } from '../../config.js';

export default class ModelProfile {
  constructor(contr) {
  this.contr = contr;
}
 getData(collection, document) {
        db.collection(`${collection}`).doc(`${document}`).get()
          .then((doc) => {
            if (doc.exists) {

              this.contr.updateDataStore(doc.data(), collection);
              this.contr.checkFullData();
            }
          })
      } 
     
      setDataWheel(result, userId){
        db.collection("wheels").doc(userId).set(result)
      }
}

