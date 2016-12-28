interface INode {
    data: string
    left: INode
    right: INode
}

var single_node: INode = {
    data: 'b',
    left: null,
    right: null
}

var shrub: INode = {
    data: "b",
    left: {
        data: "a",
        left: null,
        right: null
    },
    right: null
}

function contains(tree: INode, value:string){
    var location = tree;
    while(location !== null){
        if(value === location.data){
            return true;
        }else{
            if(value < location.data){
                location = location.left;
            }else{
                location = location.right;
            }
        }
    }
}

function contains_rev(tree: INode, value: string){
    if(tree === null){
        return false;
    }
    if(value === tree.data){
        return true;
    }
    if(value < tree.data){
        return contains_rev(tree.left, value);
    }else{
        return contains_rev(tree.right, value);
    }   
}

function count(tree: INode){
    if(tree === null) return 0
    return count(tree.left) + count(tree.right) + 1;
}
