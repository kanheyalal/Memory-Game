import Display from './components/Display/Display';
import IconArray from './iconsArray/IconArray';

function App() {
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const arr = IconArray();
  shuffle(arr);


  return (
    <div>
      <Display array={arr}/>
    </div>
  );
}

// test

export default App;
