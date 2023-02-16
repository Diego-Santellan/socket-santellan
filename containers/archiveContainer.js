const {promises: fs} = require('fs')

class archiveContainer{
    constructor(ruta){
        this.ruta = ruta;
    }

    async toList(id){
        const objs = await this.toListAll()
        const buscado = objs.find(o => o.id == id);
        return  buscado
    }

    async toListAll(){
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async save(obj) {
        const objs = await this.toListAll()

        let newId
        if (objs.lenght == 0) {
            newId =1
        } else {
            newId = objs.id + 1        
        }

        const newObj = { ...obj, id:newId}
        objs.push(newObj)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    async update(elem, id) {
        const objs = await this.toListAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = elem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar: ${error}`)
            }
        }
    }

    async detele(id) {
        const objs = await this.toListAll()
        const index = objs.findIndex(o => o.id == id)
        if (index ==-1) {
            throw new Error(`Error al borrar: no se encontro el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deteleAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
            
        }
    }

}

module.exports = archiveContainer