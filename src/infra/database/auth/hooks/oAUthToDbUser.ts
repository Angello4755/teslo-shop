import * as mongoDB from '../../mongoDB';
import User from '../models/User';

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    await mongoDB.connect();
    const user = await User.findOne({ email: oAuthEmail });
    if (user)  {
        await mongoDB.disconnect();
        const { _id, name, email, role  } = user;
        return  { _id, name, email, role  };
    }
    
    const newUser = new User({email: oAuthEmail, name: oAuthName, password: '@', role: 'client'  });

    await newUser.save();
    await mongoDB.disconnect();
    const { _id, name, email, role  } = newUser;
    return { _id, name, email, role  };
}