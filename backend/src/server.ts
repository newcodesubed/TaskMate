import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  setTimeout(()=>{
    console.log('This is repeating!');

  }, 1000)
});
