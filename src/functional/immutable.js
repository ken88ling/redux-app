import { Map } from 'immutable';

export default (ImmutableSample) => {
  // let book = { title: 'Harry Potter' };
  let book = Map({ title: 'Harry Potter' });

  function publish(book) {
    // book.isPublished = true;
    return book.set('isPublished', true);
  }

  // publish(book);
  book = publish(book);

  console.log('book => ', book.toJS());
};
