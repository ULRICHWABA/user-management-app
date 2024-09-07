import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './event.schema';
import { CreateEventDto } from './create-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

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

  // Méthode pour trouver un événement par son ID
  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Événement avec ID ${id} non trouvé`);
    }
    return event;
  }
  
  // Méthode pour filtrer par année
  async findByYear(year: number): Promise<Event[]> {
    return this.eventModel.find({
      date: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`),
      },
    }).exec();
  }

 // Méthode pour filtrer les événements par mois
  async findByMonth(month: number): Promise<Event[]> {
    const startDate = new Date(new Date().getFullYear(), month - 1, 1); // Premier jour du mois
    const endDate = new Date(new Date().getFullYear(), month, 1); // Premier jour du mois suivant

    return this.eventModel.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    }).exec();
  }

  // Méthode pour filtrer par heure
  async findByHour(hour: string): Promise<Event[]> {
    return this.eventModel.find({ heure: hour }).exec();
  }
}
