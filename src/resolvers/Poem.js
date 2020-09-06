const author = async (parent, args, context) => {
    const data = await context.prisma.poem({ id: parent.id }).author();
    return data;
}