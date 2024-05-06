export function filterJobs(data, filters) {
  return data.filter((job) => {
    return Object.entries(filters).every(([key, value]) => {
      const filterHandlers = {
        location: () => {
          if (value.includes("in office")) {
            return (
              job.location.toLowerCase() !== "remote" &&
              job.location.toLowerCase() !== "hybrid"
            );
          } else {
            return value.length === 0 || value.includes(job.location);
          }
        },
        jobRole: () => value.length === 0 || value.includes(job.jobRole),
        minExp: () => value === null || job.minExp >= value,
        maxExp: () => value === null || job.maxExp <= value,
        minJdSalary: () => value === null || job.minJdSalary >= value,
        maxJdSalary: () => value === null || job.maxJdSalary <= value,
        companyName: () => value === null || job.companyName.includes(value),
      };

      const handler = filterHandlers[key] || (() => true);
      return handler();
    });
  });
}
