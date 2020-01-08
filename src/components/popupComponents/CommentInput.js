import React from "react";

export class CommentInput extends React.Component {
  state = { currentEmoji: `smile`, comment: `` };
  render() {
    return (
      <div className="film-details__new-comment">
        <div htmlFor="add-emoji" className="film-details__add-emoji-label">
          <img
            src={`images/emoji/${this.state.currentEmoji}.png`}
            width="55"
            height="55"
            alt="emoji"
          />
        </div>

        <label className="film-details__comment-label">
          <textarea
            className="film-details__comment-input"
            placeholder="Select reaction below and write comment here"
            name="comment"
            onChange={event => {
              this.setState({ comment: event.target.value });
            }}
            onKeyDown={e => {
              this.props.handleSubmit(e);
              this.props.getCurrentComment(
                this.state.comment,
                this.state.emoji
              );
            }}
          />
        </label>

        <div className="film-details__emoji-list">
          <input
            className="film-details__emoji-item visually-hidden"
            name="comment-emoji"
            type="radio"
            id="emoji-smile"
            value="smile"
            onClick={() => {
              this.setState({ currentEmoji: `smile` });
            }}
          />
          <label className="film-details__emoji-label" htmlFor="emoji-smile">
            <img
              src="./images/emoji/smile.png"
              width="30"
              height="30"
              alt="emoji"
            />
          </label>

          <input
            className="film-details__emoji-item visually-hidden"
            name="comment-emoji"
            type="radio"
            id="emoji-sleeping"
            value="neutral-face"
            onClick={() => {
              this.setState({ currentEmoji: `sleeping` });
            }}
          />
          <label className="film-details__emoji-label" htmlFor="emoji-sleeping">
            <img
              src="./images/emoji/sleeping.png"
              width="30"
              height="30"
              alt="emoji"
            />
          </label>

          <input
            className="film-details__emoji-item visually-hidden"
            name="comment-emoji"
            type="radio"
            id="emoji-gpuke"
            value="grinning"
            onClick={() => {
              this.setState({ currentEmoji: `puke` });
            }}
          />
          <label className="film-details__emoji-label" htmlFor="emoji-gpuke">
            <img
              src="./images/emoji/puke.png"
              width="30"
              height="30"
              alt="emoji"
            />
          </label>
        </div>
      </div>
    );
  }
}
