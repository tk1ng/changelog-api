import prisma from '../db';

// Get all products
export const getProducts = async (req: any, res: any) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({ data: user?.products })
}

// Get single product
export const getOneProduct = async (req: any, res: any) => {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    });

    res.json({ data: product });
}

// Create product
export const createProduct = async (req: any, res: any, next) => {
    // error handling with try catch block
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })

        res.json({ data: product });
    } catch (err) {
        next(err);
    }

}

//  Update product
export const updateProduct = async (req: any, res: any) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    });

    res.json({ data: updated });
}

//  Delete product
export const deleteProduct = async (req: any, res: any) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    });

    res.json({ data: deleted });
}