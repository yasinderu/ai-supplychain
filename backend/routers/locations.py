from fastapi import APIRouter, status, Depends, HTTPException
from schemas import Location, LocationCreate
from repositories import get_locations, get_location_detail, create_location, delete_location
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user
from uuid import UUID

location_router = APIRouter(
    prefix="/locations", dependencies=[Depends(get_current_user)]
)


@location_router.get(
    "/",
    summary="List all location",
    status_code=status.HTTP_200_OK,
    response_model=list[Location],
)
async def get_list_location(db: Session = Depends(get_db)):
    return get_locations(db=db)


@location_router.get(
    "/{location_id}",
    summary="Get location details",
    status_code=status.HTTP_200_OK,
    response_model=Location,
)
async def get_location_details(location_id: UUID, db: Session = Depends(get_db)):
    return get_location_detail(db=db, location_id=location_id)


@location_router.post(
    "/",
    summary="Create or add location data",
    status_code=status.HTTP_201_CREATED,
    response_model=Location,
)
async def add_new_location(location: LocationCreate, db: Session = Depends(get_db)):
    return create_location(db=db, location=location)

@location_router.delete("/{location_id}", summary="Delete item", status_code=status.HTTP_200_OK)
async def delete_location_data( location_id: UUID, db: Session=Depends(get_db)):
    deleted_location = delete_location(db=db, location_id=location_id)

    if delete_location is None:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return {"message": "Sucess"}
