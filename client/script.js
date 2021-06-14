new Vue({
    el: '#app',
    created() {
      this.getBooks();
    },
    data: {
      books: [],
      path: 'http://localhost:5000/books',
      addBookForm: {
        title: '',
        author: '',
        read: [],
      },
      editForm: {
        id: '',
        title: '',
        author: '',
        read: [],
      },
      alertMessage: '',
      alertShow: false,
    },
    methods: {
      getBooks() {
        axios.get(this.path)
        .then(response => { 
          this.books = response.data.books; 
        })
        .catch((error) => {
          console.error(error);
        });
      },
      addBook(payload) {
        axios.post(this.path, payload)
          .then(() => {
            this.getBooks();
            this.alertShow = true;
            this.alertMessage = 'Book added!';
          })
          .catch((error) => {
            console.log(error);
            this.getBooks();
          });
      },
      initForm() {
        this.addBookForm.title = '';
        this.addBookForm.author = '';
        this.addBookForm.read = [];
        this.editForm.id = '';
        this.editForm.title = '';
        this.editForm.author = '';
        this.editForm.read = [];
      },
      onSubmit(evt) {
        evt.preventDefault();
        this.$refs.addBookModal.hide();
        let read = false;
        if (this.addBookForm.read[0]) read = true;
        const payload = {
          title: this.addBookForm.title,
          author: this.addBookForm.author,
          read,
        };
        this.addBook(payload);
        this.initForm();
      },
      onReset(evt) {
        evt.preventDefault();
        this.initForm();
      },
      editBook(book) {
        this.editForm = book;
      },
      onSubmitUpdate(evt) {
        evt.preventDefault();
        this.$refs.editBookModal.hide();
        let read = false;
        if (this.editForm.read[0]) read = true;
        const payload = {
          title: this.editForm.title,
          author: this.editForm.author,
          read,
        };
        this.updateBook(payload, this.editForm.id);
      },
      updateBook(payload, bookID) {
        const path = `http://localhost:5000/books/${bookID}`;
        axios.put(path, payload)
          .then(() => {
            this.getBooks();
            this.alertShow = true;
            this.alertMessage = 'Book updated!';
          })
          .catch((error) => {
            console.error(error);
            this.getBooks();
          });
      },
      onResetUpdate(evt) {
        evt.preventDefault();
        this.$refs.editBookModal.hide();
        this.initForm();
      },
      removeBook(bookID) {
        const path = `http://localhost:5000/books/${bookID}`;
        axios.delete(path)
          .then(() => {
            this.getBooks();
            this.alertMessage = 'Book removed!';
            this.alertShow = true;
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            this.getBooks();
          });
      },
      onDeleteBook(book) {
        this.removeBook(book.id);
      },
    }
  })