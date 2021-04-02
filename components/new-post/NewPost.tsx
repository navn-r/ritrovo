import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PostInput } from "../../apollo/generated-types";
import styles from "./NewPost.module.css";

interface NewPostProps {
  user: string;
  onSubmit: (input: PostInput) => Promise<any>;
}

const NewPost: React.FC<NewPostProps> = ({ user, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onNewPost = () => {
    setTitle("");
    setBody("");
    return onSubmit({
      author: user,
      title: title.trim(),
      body: body.trim(),
    });
  }

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(t) => setTitle(t.target.value)}
          className={styles.title}
          placeholder="what's on your spaghetti?"
        />
        {!!title.trim().length && !!body.trim().length && (
          <div onClick={onNewPost.bind(this)}>
            <FontAwesomeIcon icon={faBullhorn}></FontAwesomeIcon>
          </div>
        )}
      </div>
      {!!title.trim().length && (
        <textarea
          name="body"
          placeholder="During a nuclear explosion, there is a certain distance of the radius where all the frozen supermarket pizzas are cooked to perfection."
          className={styles.text}
          onChange={(b) => setBody(b.target.value)}
        ></textarea>
      )}
    </div>
  );
};

export default NewPost;
