import Display from './components/Display/Display';

function App() {
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const arr = [];
    for (let i = 1; i <= 8; i++) {
      arr.push(i);
      arr.push(i);
    }
  shuffle(arr);


  return (
    <div>
      <Display array={arr}/>
    </div>
  );
}

export default App;
