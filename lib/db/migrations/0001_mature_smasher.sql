CREATE TABLE `teacher_dismissals` (
	`id` text PRIMARY KEY NOT NULL,
	`reason` text NOT NULL,
	`dismissed_from_date` integer NOT NULL,
	`dismissed_until_date` integer NOT NULL,
	`status` text NOT NULL,
	`teacher_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `teachers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`file_number` integer NOT NULL,
	`job_title` text NOT NULL,
	`phone` text,
	`email` text,
	`role` text,
	`available_for_invig` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `teacher_file_number_idx` ON `teachers` (`file_number`);