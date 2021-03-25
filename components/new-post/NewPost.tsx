import { PostInput } from "../../apollo/generated-types";
import styles from './NewPost.module.css';

interface NewPostProps {
  onSubmit: (input: PostInput) => Promise<any>;
}

const NewPost: React.FC<NewPostProps> = ({ onSubmit }) => {
  return (
    <div className={styles.container}>
      NEW POST COMPONENT GOES HERE
    </div>
  );
};

export default NewPost;