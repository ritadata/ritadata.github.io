const mixpanelToken = "9a9432edda95d53541aa76fd98bdb0bb";
mixpanel.init(mixpanelToken, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

const Header = () => {
  const handleJoinBetaClick = (e) => {
    e.preventDefault();

    // Redirect to the survey
    window.location.href = 'https://qualtricsxmx3pmfphhl.qualtrics.com/jfe/form/SV_01jheiFaf6kU8Au';
  };

  return (
    <div className="navbar__container__fluid animate__animated animate__fadeIn">
      <div className="logo__section">
        <img
          src="assets/logo.svg"
          alt="Logo"
          width="100%"
          height="100%"
          className="d-inline-block align-top header__left__logo"
        />
      </div>
      <div className="content__section" style={{marginBottom: 100}}>
        <h1>
          Sondaggio per i proprietari di animali domestici <br/>
        </h1>
        <p>
       Si prega di leggere attentamente le istruzioni contenute nel sondaggio per completare l'attività per intero. Richiede un account Google. Il sondaggio è in italiano.
        </p>
        <div className="input__section">
          <div className="input-container animated fadeIn">
            <a className="demo-button" href="#" onClick={handleJoinBetaClick}>
              Inizia il Sondaggio

            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="container__wrapper">
      <Header />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
