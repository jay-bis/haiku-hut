const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const post = (parent, args, context, info) => {
    const userId = getUserId(context)

    if (!userId || userId === null) {
        throw new Error('User is not authorized.')
    }

    const newPoem = context.prisma.poem.create({
        data: {
            title: args.title,
            content: args.content,
            author: {
                connect: { id: userId }
            },
            isHaiku: args.isHaiku
        }
    })
   return newPoem
}

const signup = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({ data: { name: args.name, email: args.email, passhash: password } })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
      token,
      user,
    }
  }

const login = async (parent, args, context, info) => {
    const user = await context.prisma.user.findOne({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.passhash)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
      token,
      user
    }
}

const createProfile = async (parent, args, context, info) => {
    const userId = getUserId(context)
    
    const profile = context.prisma.profile.create({
        data: {
            favpoem: args.favpoem,
            bio: args.bio
        }
    })

    context.prisma.user.update({
        where: { id: userId },
        data: { profileid: profile.id }
    })
    
    return profile
}

module.exports = {
    post,
    signup,
    login,
    createProfile
}