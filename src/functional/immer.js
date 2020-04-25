import { produce } from 'immer';

export default (immerSample) => {
  let book = { title: 'Harry Potter' };

  // function publish(book) {
  //   book.isPublished = true;
  // }

  function publish(book) {
    return produce(book, (draftBook) => {
      draftBook.isPublished = true;
    });
  }

  // publish(book);
  let updated = publish(book);

  console.log('book => ', book);
  console.log('book => ', updated);
};
