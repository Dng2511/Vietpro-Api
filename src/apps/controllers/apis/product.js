const ProductModel = require("../../models/product");
const CommentModel = require("../../models/comment");
const pagination =  require("../../../libs/pagination");
exports.index = async (req, res) => {
    const query = {};
    query.is_stock = req.query.is_stock || true;
    query.is_featured = req.query.featured || false;
    if(req.query.name) query.$text = { $search: req.query.name };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = limit*(page-1);
    const products = await ProductModel.find(query)
    .sort({_id: -1})
    .skip(skip)
    .limit(limit);
    res
    .status(200)
    .json({
        status: "success",
        filter: {
            is_stock: query.is_stock,
            is_featured: query.is_featured,
            page,
            limit,
        },
        data: {
            docs: products,
        },
        pages: await pagination(ProductModel, limit, page, query),

    })
}

exports.show = async (req, res) => {
    const id = req.params.id
    const product = await ProductModel.findById(id);
    res.status(200).json({
        status: "success",
        data: product,
    })
}
exports.comment = async (req, res) =>{
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = limit*(page-1);
    const comments = await CommentModel.find({prd_id: id}).sort({_id: -1}).skip(skip).limit(limit);
    res.status(200).json({
        status: "success",
        filter: {
            page,
            limit,

        },
        data: {
            docs: comments,
        },
        pages: await pagination(CommentModel, limit, page, {prd_id: id})
    })
}
exports.storeComment = async (req, res) =>{
    const id = req.params.id;
    const body = req.body;
    const comment = {
        name: body.name,
        email: body.email,
        body: body.body,
        prd_id: id,
    };
    await new CommentModel(comment).save();
    res.status(200).json({
        status: "success",
        message: "comment created successfully",
    })

}
