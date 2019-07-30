import { db } from '../../config.js';

export default class ModelQuiz {
  constructor(contr) {
  this.contr = contr;
}
    getData() {
        db.collection("questions").doc("questions").get()
          .then((doc) => {
            if (doc.exists) {
              this.contr.renderQuiz(doc.data().questions)
            }
          })
      }

      setDataWheel(result, userId){
        db.collection('wheels').doc(`${userId}`).set(result)
            .then(function () {
                console.log("Test successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
      }
}

