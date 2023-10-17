import FriendConcept from "./concepts/friend";
import PostConcept from "./concepts/post";
import SuppressionConcept from "./concepts/suppression";
import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";

// App Definition using concepts
export const Suppression = new SuppressionConcept();
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();
export const Post = new PostConcept();
export const Friend = new FriendConcept();
