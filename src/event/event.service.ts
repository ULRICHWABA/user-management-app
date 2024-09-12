    import { Injectable, NotFoundException } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { Event, EventDocument } from './event.schema';
    import { CreateEventDto } from './create-event.dto';

    @Injectable()
    export class EventService {
      constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}
    // Méthode pour filtrer par jour, mois, année et paginer les résultats
    // async findByDateWithPagination(jour: number, mois: number, annee: number, page: number, limit: number): Promise<Event[]> {
    //   const startDate = new Date(annee, mois - 1, jour, 0, 0, 0);  // Début du jour
    //   const endDate = new Date(annee, mois - 1, jour, 23, 59, 59); // Fin du jour

    //   const skip = (page - 1) * limit; 
    //   return this.eventModel.find({
    //     date: {
    //       $gte: startDate,
    //       $lt: endDate,
    //     },
    //   })
    //   .skip(skip)
    //   .limit(limit)
    //   .exec();
    // }
    async findByDateWithPagination(jour?: number, mois?: number, annee?: number, page = 1, limit = 10): Promise<Event[]> {
      // Création des conditions dynamiques pour la date
      const dateConditions: any = {};
    
      if (annee) {
        dateConditions.$gte = new Date(annee, 0, 1); // Début de l'année
        dateConditions.$lt = new Date(annee + 1, 0, 1); // Fin de l'année
      }
    
      if (mois) {
        const year = annee || new Date().getFullYear(); // Si pas d'année, utiliser l'année actuelle
        dateConditions.$gte = new Date(year, mois - 1, 1); // Début du mois
        dateConditions.$lt = new Date(year, mois, 1); // Fin du mois
      }
    
      if (jour) {
        const year = annee || new Date().getFullYear(); // Si pas d'année, utiliser l'année actuelle
        const month = mois ? mois - 1 : new Date().getMonth(); // Si pas de mois, utiliser le mois actuel
        dateConditions.$gte = new Date(year, month, jour, 0, 0, 0); // Début du jour
        dateConditions.$lt = new Date(year, month, jour, 23, 59, 59); // Fin du jour
      }
    
      // Pagination
      const skip = (page - 1) * limit;
    
      // Exécution de la requête avec les conditions de date et pagination
      return this.eventModel.find({
        date: {
          ...dateConditions, // Insertion des conditions de date
        },
      })
        .skip(skip)
        .limit(limit)
        .exec();
    }
    
      // Méthode pour créer un événement
      async create(createEventDto: CreateEventDto, userId: string): Promise<Event> {
        const createdEvent = new this.eventModel({
          ...createEventDto,
          createur: userId,  // L'utilisateur authentifié devient le créateur de l'événement
        });
        return createdEvent.save();
      }

      // Méthode pour lister tous les événements
      async findAll(): Promise<Event[]> {
        return this.eventModel.find().exec();
      }
      // Méthode pour filtrer par heure
      async findByHour(hour: string): Promise<Event[]> {
        return this.eventModel.find({ heure: hour }).exec();
      }

      
      // Méthode pour trouver un événement par son ID
      async findOne(id: string): Promise<Event> {
        const event = await this.eventModel.findById(id).exec();
        if (!event) {
          throw new NotFoundException(`Événement avec ID ${id} non trouvé`);
        }
        return event;
      }
    }
