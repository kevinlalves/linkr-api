export const userSerializer = ({ user, users }) => {
  if (users) {
    return users.map((usr) => ({
      id: usr.id,
      pictureUrl: usr.pictureUrl,
      createdAt: usr.createdAt,
      username: usr.username,
    }));
  }

  return {
    id: user.id,
    pictureUrl: user.pictureUrl,
    createdAt: user.createdAt,
    username: user.username,
  };
};
