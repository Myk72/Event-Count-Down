import React from "react";
import { useForm } from "react-hook-form";
import { X, CalendarArrowDown } from "lucide-react";
import ErrorMessage from "../ErrorMessage/page";
interface Props {
  onClose: any;
  onSubmit: any;
}

const AddEvent: React.FC<Props> = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const dateValue = watch("date");

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between p-2">
        <CalendarArrowDown size="24" />
        <button onClick={onClose}>
          <X size="24" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center text-lg font-serif font-semibold">
          Add Event
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-2">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div>Title</div>
              <input
                placeholder="Event Title"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
                className="border rounded-lg p-2"
              />

              <ErrorMessage message={errors.title?.message} />
            </div>
            <div className="flex flex-col gap-1">
              <div>Date</div>
              <input
                type="date"
                {...register("date", {
                  required: {
                    value: true,
                    message: "Date is required",
                  },
                  validate: (value) => {
                    const currentDate = new Date();
                    const selectedDate = new Date(value);
                    currentDate.setHours(0, 0, 0, 0);
                    selectedDate.setHours(0, 0, 0, 0);
                    if (selectedDate < currentDate) {
                      return "Please select a date that is today or in the future.";
                    }
                    return true;
                  },
                })}
                className="border rounded-lg p-2"
              />
              <ErrorMessage message={errors.date?.message} />
            </div>
            <div className="flex flex-col gap-1">
              <div>Time</div>
              <input
                type="time"
                {...register("time", {
                  required: {
                    value: true,
                    message: "Time is required",
                  },
                  validate: (value, { getValues }) => {
                    if (!dateValue) {
                      return true;
                    }

                    const currentDate = new Date();
                    const selectedDate = new Date(dateValue);
                    const selectedTime = new Date(
                      `${selectedDate.toLocaleDateString()} ${value}`
                    );

                    if (
                      selectedDate.toDateString() === currentDate.toDateString()
                    ) {
                      if (selectedTime < currentDate) {
                        return "Time cannot be in the past";
                      }
                    }

                    return true;
                  },
                })}
                className="border rounded-lg p-2"
              />
              <ErrorMessage message={errors.time?.message} />
            </div>
            <div className="flex flex-col gap-1">
              <div>Description</div>
              <input
                placeholder="Description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
                className="border rounded-lg p-2"
              />
              <ErrorMessage message={errors.description?.message} />
            </div>

            <button
              type="submit"
              className="rounded-2xl p-2 bg-blue-500 text-white mt-5
          "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
