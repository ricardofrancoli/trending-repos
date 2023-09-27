import Repos from '@/components/repos/Repos';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1>Trending Repos</h1>
      <h2>
        See the top 30 trending 🚀 public repositories during the last week
      </h2>
      <p>
        If you wanna see more (or less), insert a different number below (max
        200)
      </p>
      <Repos />
    </div>
  );
}

export default App;
