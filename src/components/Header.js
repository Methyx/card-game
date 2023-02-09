// style
import "../style/header.css";

const Header = () => {
  return (
    <header>
      <h1>Solitaire Card Game</h1>
      <button
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#new-game"
      >
        Start new game
      </button>

      <div className="modal fade" id="new-game">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <p>Start a new game ?</p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No, continue
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  console.log("restart");
                }}
              >
                Yes, restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
