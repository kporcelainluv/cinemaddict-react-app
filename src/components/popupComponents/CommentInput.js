import React from "react";
import { Emoji, EmojiId } from "../../consts";

export class CommentInput extends React.Component {
  render() {
    return (
      <div className="film-details__new-comment">
        <div htmlFor="add-emoji" className="film-details__add-emoji-label">
          <img
            src={`images/emoji/${this.props.emoji}.png`}
            width="55"
            height="55"
            alt="emoji"
          />
        </div>

        <label className="film-details__comment-label">
          <input
            className="film-details__comment-input"
            placeholder="Select reaction below and write comment here"
            name="comment"
            form={"hello"}
            value={this.props.comment}
            onChange={event => {
              this.props.getCurrentComment(event.target.value);
            }}
          />
        </label>

        <div className="film-details__emoji-list">
          <input
            className="film-details__emoji-item visually-hidden"
            name="comment-emoji"
            type="radio"
            id={EmojiId.SMILE}
            value={Emoji.SMILE}
            onClick={() => {
              this.props.getCurrentEmoji(Emoji.SMILE);
            }}
          />
          <label className="film-details__emoji-label" htmlFor={EmojiId.SMILE}>
            <img
              src={`./images/emoji/${Emoji.SMILE}.png`}
              width="30"
              height="30"
              alt="emoji"
            />
          </label>

          <input
            className="film-details__emoji-item visually-hidden"
            name="comment-emoji"
            type="radio"
            id={EmojiId.SLEEPING}
            value={Emoji.SLEEPING}
            onClick={() => {
              this.props.getCurrentEmoji(Emoji.SLEEPING);
            }}
          />
          <label
            className="film-details__emoji-label"
            htmlFor={EmojiId.SLEEPING}
          >
            <img
              src={`./images/emoji/${Emoji.SLEEPING}.png`}
              width="30"
              height="30"
              alt="emoji"
            />
          </label>

          <input
            className="film-details__emoji-item visually-hidden"
            name="comment-emoji"
            type="radio"
            id={EmojiId.PUKE}
            value={EmojiId.PUKE}
            onClick={() => {
              this.props.getCurrentEmoji(Emoji.PUKE);
            }}
          />
          <label className="film-details__emoji-label" htmlFor={EmojiId.PUKE}>
            <img
              src={`./images/emoji/${Emoji.PUKE}.png`}
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
