import React, { Component } from "react";
import GridMDC from "./components/GridMDC";
import PaperMDC from "./components/PaperMDC";
import CharCard from "./components/CharCard";
import Score from "./components/Score";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";
import BottomNavMDC from "./components/BottomNavMDC";
import characters from "./characters.json";

class App extends Component {
  state = {
    characters: characters,
    pickedChars: [],
    topScore: 0,
    alertMessage: ""
  };

  handlePicked = event => {
    const name = event.target.attributes.getNamedItem("name").value;
    this.shuffleCharacters();
    this.checkGuess(name, this.updateTopScore);
  };

  shuffleCharacters = () => {
    this.setState(
      (this.state.characters = this.shuffleArray(this.state.characters))
    );
  };

  shuffleArray = a => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.pickedChars.includes(name)) {
      newState.alertMessage = `YOU HAD YOUR TURN! "${name.toUpperCase()}"!`;
      newState.pickedChars = [];
      this.setState((this.state = newState));
    } else {
      newState.pickedChars.push(name);
      newState.alertMessage = `GREAT PICK!`;
      this.setState((this.state = newState));
    }
    cb(newState, this.alertWinner);
  };

  updateTopScore = (newState, cb) => {
    if (newState.pickedChars.length > newState.topScore) {
      newState.topScore++;
      this.setState((this.state = newState));
    }
    cb(newState);
  };

  alertWinner = newState => {
    if (newState.pickedChars.length === 12) {
      newState.alertMessage = "WINNER!";
      newState.pickedChars = [];
      this.setState((this.state = newState));
    }
  };

  render() {
    return (
      <div>
        <NavBar style={{ background: "#566583", marginBottom: "5px" }} />

        <GridMDC
          container
          direction="column"
          style={{ margin: "0 auto", maxWidth: 900 }}
        >
          <GridMDC item lg={12}>
            <PaperMDC>
              {this.state.alertMessage === "GREAT PICK!" ? (
                <Alert
                  message={this.state.alertMessage}
                  style={{ color: "blue" }}
                />
              ) : (
                <Alert
                  message={this.state.alertMessage}
                  style={{ color: "yellow" }}
                />
              )}
            </PaperMDC>
          </GridMDC>

          <GridMDC container justify="space-between">
            <GridMDC item lg={6} md={6} sm={12} xs={12}>
              <PaperMDC>
                <Score type="Score" score={this.state.pickedChars.length} />
              </PaperMDC>
            </GridMDC>

            <GridMDC item lg={6} md={6} sm={12} xs={12}>
              <PaperMDC>
                <Score type="Top Score" score={this.state.topScore} />
              </PaperMDC>
            </GridMDC>
          </GridMDC>
        </GridMDC>

        <GridMDC
          container
          spacing={24}
          justify="center"
          style={{ maxWidth: 945, margin: "0 auto" }}
        >
          {this.state.characters.map(char => (
            <GridMDC item lg={3} md={3} sm={4} xs={6}>
              <CharCard
                id={char.id}
                name={char.name}
                image={char.image}
                key={char.id}
                handlePicked={this.handlePicked}
              />
            </GridMDC>
          ))}
        </GridMDC>
        <BottomNavMDC
          style={{
            background: "#566583",
            marginTop: "18px",
            paddingTop: "15px",
            borderTop: "2.5px solid slategray"
          }}
        >
          <a
            href="https://github.com/philiptd5000/clicky-game-REACT"
            target="_blank"
            className="link"
            alt="clicky-game-github-link"
          >
            <i className="fa fa-github fa-2x"></i>
          </a>
        </BottomNavMDC>
      </div>
    );
  }
}

export default App;
