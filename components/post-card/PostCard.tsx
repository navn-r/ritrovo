import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Post, PostUpdateInput } from "../../apollo/generated-types";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
  canEdit: boolean;
  onEdit: (edit: PostUpdateInput) => Promise<any>;
  onDelete: (_id: string) => Promise<any>;
}

const PostCard: React.FC<PostCardProps> = ({
  post: { _id, title, author, body, updatedAt, createdAt },
  canEdit,
  onEdit,
  onDelete,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [titleInput, setTitle] = useState(title);
  const [bodyInput, setBody] = useState(body);

  const onPressEdit = async () => {
    setIsEdit(!isEdit);
    const same = titleInput.trim() === title && bodyInput.trim() === body;
    if (
      isEdit &&
      !!titleInput.trim().length &&
      !!bodyInput.trim().length &&
      !same
    ) {
      await onEdit({
        _id,
        title: titleInput.trim(),
        body: bodyInput,
      });
    }
  };

  const onPressDelete = async () => {
    await onDelete(_id);
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          className={styles.title}
          defaultValue={titleInput}
          onChange={(t) => setTitle(t.target.value)}
          readOnly={!canEdit || !isEdit}
        />
        {canEdit && (
          <>
            <FontAwesomeIcon
              icon={isEdit ? faCheck : faEdit}
              color={isEdit ? "#0ACB23" : "var(--lilac)"}
              onClick={onPressEdit.bind(this)}
              width="25"
            />

            <FontAwesomeIcon
              icon={faTrash}
              onClick={onPressDelete.bind(this)}
              color="#f00"
              width="22"
            />
          </>
        )}
      </div>
      <div className={styles.postInfo}>
        <strong>@{author}</strong>:{" "}
        {createdAt !== updatedAt ? (
          <span className={styles.updated}>
            {new Date(+createdAt!).toLocaleDateString()}, U:{" "}
          </span>
        ) : (
          <></>
        )}
        <span>{new Date(+updatedAt!).toLocaleString()}</span>
      </div>
      <div className={styles.divider}></div>
      {canEdit && isEdit ? (
        <textarea
          name="body"
          className={styles.text}
          defaultValue={bodyInput}
          onChange={(b) => setBody(b.target.value)}
        ></textarea>
      ) : (
        <ReactMarkdown plugins={[gfm]}>{bodyInput}</ReactMarkdown>
      )}
    </div>
  );
};

export default PostCard;
