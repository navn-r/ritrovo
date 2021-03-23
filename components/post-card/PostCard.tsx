import ReactMarkdown from "react-markdown";
import { Post } from "../../apollo/generated-types";
import gfm from "remark-gfm";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({
  post: { title, author, body, updatedAt },
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.postInfo}>
        <strong>@{author}</strong>:{" "}
        <span>{new Date(+updatedAt!).toLocaleString()}</span>
      </div>
      <div className={styles.divider}></div>
      <ReactMarkdown plugins={[gfm]}>{body}</ReactMarkdown>
    </div>
  );
};

export default PostCard;
