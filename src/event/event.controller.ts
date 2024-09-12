  import { Controller, Get, Post, Body, Param, UseGuards, Request, Query, BadRequestException } from '@nestjs/common';
  import { EventService } from './event.service';
  import { CreateEventDto } from './create-event.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  import { UserRole } from '../user/user.schema';
  import { Event } from './event.schema';

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('events')
  export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('N')
    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    async create(@Body() createEventDto: CreateEventDto, @Request() req) {
      // Utilisation de l'ID de l'utilisateur authentifié
      return this.eventService.create(createEventDto, req.user);
    }
    // Route pour récupérer les événements filtrés par date avec pagination
    @Get('by-date')
    @Roles(UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER)
    async findByDateWithPagination(
      @Query('jour') jour: string,
      @Query('mois') mois: string,
      @Query('annee') annee: string,
      @Query('page') page = '1',  
      @Query('limit') limit = '10'
    ) {
      const jourNum = parseInt(jour, 10); undefined;
      const moisNum = parseInt(mois, 10); undefined;
      const anneeNum = parseInt(annee, 10);undefined;
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      return this.eventService.findByDateWithPagination(jourNum, moisNum, anneeNum, pageNum, limitNum);
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
      // Route pour obtenir les événements filtrés par heure
      @Get('hour/:hour')
      @Roles(UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER)
      async findByHour(@Param('hour') hour: string) {
        return this.eventService.findByHour(hour);
      }


    }
