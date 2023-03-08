

export const getCurrentUser = async (req, res) => {
  const { userId } = res.Params;

  console.log('rodou userMe (buscar informações usuario)');
  try {
    const {
      rows: [user],
    } = await getUserBy('id', userId);
    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }

    res.send({ user });
  } catch (error) {
    internalError(error, res);
  }
};
