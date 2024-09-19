import { MenuItem } from "@material-ui/core"

const PopOver = ({ tagId, tagsData, handleAdd, handleMenuClose }) => {
    
    return (
        <div>
            {
                Object.keys(tagsData).map((taglabel) =>
					tagsData[taglabel].id === tagId ? (
						tagsData[taglabel].choices.map((tag) => (
							<MenuItem onClick={() => {
								handleAdd(tag, tagId);
								handleMenuClose(tagId);
							}}> {tag} </MenuItem>
						))
					) : null
				)
            }
        </div>
    )
}

export default PopOver
