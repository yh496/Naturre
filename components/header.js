import styles from '../styles/Header.module.css'
export default function Header() {
  // const classes = useStyles();
  return (
    <div>
      <div className={styles.title}>Naturre</div>
      <div className={styles.login}>Login/Register</div>
      <div className={styles.about}>About</div>

    </div>
  )
}
