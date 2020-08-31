const feed = async (parent, args, context) => {
    return await context.prisma.poem.findMany()  
}

const users = async (parent, args, context) => {
    return await context.prisma.user.findMany()
}

const findUser = async (parent, args, context) => {
    return await context.prisma.user.findOne({
        where: {
            id: args.id
        }
    })
}

// findMany, because there can be more than one user with the same name
const findUserByName = async (parent, args, context) => {
    return await context.prisma.user.findMany({
        where: {
            name: args.name
        }
    })
}

const findUserByEmail = async (parent, args, context) => {
    return await context.prisma.user.findOne({
        where: {
            email: args.email
        }
    })
}

const findPoem = async (parent, args, context) => {
    return await context.prisma.poem.findOne({
        where: {
            id: args.id
        }
    })
}

// findMany, because there can be more than one poem with the same title
const findPoemByTitle = async (parent, args, context) => {
    return await context.prisma.poem.findMany({
        where: {
            title: args.title
        }
    })
}

module.exports = {
    feed,
    users,
    findUserByName,
    findUser,
    findPoem,
    findPoemByTitle,
    findUserByEmail
}