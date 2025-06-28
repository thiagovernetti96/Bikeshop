import {Bike} from '../model/bike';

export class BikeRepository {
private bikes: Bike[] = [];
private idCounter: number = 1;

  inserir(bike: Omit<Bike,'id'>): Bike {
    const newBike: Bike = {
      id: this.idCounter++,
      modelo: bike.modelo,
      valor: bike.valor,
      marca: bike.marca
    };
      this.bikes.push(newBike);
      return newBike;

  }

  listar(): Bike[] {
    return this.bikes;
  }

  buscarporId(id: number): Bike | undefined {
    return this.bikes.find(bike => bike.id === id);
  }

  atualizar(id: number, bike: Omit<Bike, 'id'>): Bike | undefined {
    const index = this.bikes.findIndex(b => b.id === id);
    if(index===-1)return undefined;
    const bikeAtualizada:Bike={
      id,
      marca:bike.marca,
      modelo:bike.modelo,
      valor:bike.valor
    };
    this.bikes[index] = bikeAtualizada;
    return bikeAtualizada; 

  }

  deletar(id: number): boolean {
    const index = this.bikes.findIndex(bike => bike.id === id);
    if (index !== -1) {
      this.bikes.splice(index, 1);
      return true;
    }
    return false;
  }
}
