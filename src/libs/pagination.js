const pagination = async (model, limit, page, query) => {
    const totalRows = await model.find(query).countDocuments();
    const totalPages = Math.ceil(totalRows / limit)
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next <= totalPages ? true : false;
    const hasPrev = prev >= 1? true : false;
    return {
        totalRows,
        totalPages,
        next: hasNext? next : null,
        prev: hasPrev? prev : null,
        hasNext,
        hasPrev,
    }
}
module.exports = pagination;