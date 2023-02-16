class MemoryContainer{
    constructor() {
        this.elementos = []
        this.id = 0
    }

    toList(id) {
        const elem = this.elementos.find(elem => elem.id == id)
        return elem || {error: `elemento no encontrado`}
    }

    toListAll(){
        return[...this.elementos]
    }

    save(elem) {
        const newElem ={...elem, id: ++this.id}
        this.elementos.push(newElem)
        return newElem
    }

    update(elem, id) {
        const newElem = { id: Number(id), ...elem }
        const index = this.elementos.findIndex(p => p.id == id)
        if (index !== -1) {
            this.elementos[index] = newElem
            return newElem
        } else {
            return { error: `elemento no encontrado` }
        }
    }

    detele(){
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index !== -1) {
            return this.elementos.splice(index, 1)
        } else {
            return {error:`elemento no encontrado`}
        }
    }

    deteleAll(){
        this.elementos = []
    }
}

module.exports = MemoryContainer