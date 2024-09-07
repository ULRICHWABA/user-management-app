import { Controller, Get, Post, Body, Param, UseGuards, Request, Query, BadRequestException } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './create-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.schema';
import { Event } from './event.schema';

//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('n')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  async create(@Body() createEventDto: CreateEventDto, @Request() req) {
    // Utilisation de l'ID de l'utilisateur authentifié
    return this.eventService.create(createEventDto, req.user._id);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER)
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER)
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  // Route pour obtenir les événements filtrés par année
  @Get('year/:year')
  async findByYear(@Param('year') year: number) {
    return this.eventService.findByYear(year);
  }

 // Route pour obtenir les événements filtrés par mois
 @Get('month')
 async findByMonth(@Query('month') month: number): Promise<Event[]> {
   if (!month || month < 1 || month > 12) {
     throw new BadRequestException('Month must be a number between 1 and 12');
   }
   return this.eventService.findByMonth(month);
 }

  // Route pour obtenir les événements filtrés par heure
  @Get('hour/:hour')
  async findByHour(@Param('hour') hour: string) {
    return this.eventService.findByHour(hour);
  }
}
