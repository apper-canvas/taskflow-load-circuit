export const applicationService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { 
            field: { Name: "jobId_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "candidateId_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          { fieldName: "appliedAt_c", sorttype: "DESC" }
        ],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching applications:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching applications:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { 
            field: { Name: "jobId_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "candidateId_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.getRecordById("application_c", parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching application with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching application with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async getByJobId(jobId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { 
            field: { Name: "jobId_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "candidateId_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "jobId_c",
            Operator: "EqualTo",
            Values: [parseInt(jobId)]
          }
        ],
        orderBy: [
          { fieldName: "appliedAt_c", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching applications by job ID:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching applications by job ID:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async getByCandidateId(candidateId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { 
            field: { Name: "jobId_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "candidateId_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "candidateId_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)]
          }
        ],
        orderBy: [
          { fieldName: "appliedAt_c", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching applications by candidate ID:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching applications by candidate ID:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(applicationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map UI field names to database field names - only Updateable fields
      const record = {
        Name: `Application for Job ${applicationData.jobId} - Candidate ${applicationData.candidateId}`,
        appliedAt_c: new Date().toISOString(),
        status_c: "screening",
        notes_c: applicationData.notes || "",
        jobId_c: parseInt(applicationData.jobId),
        candidateId_c: parseInt(applicationData.candidateId)
      };

      const params = {
        records: [record]
      };

      const response = await apperClient.createRecord("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create application ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating application:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating application:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async updateStatus(applicationId, newStatus) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = {
        Id: parseInt(applicationId),
        status_c: newStatus
      };

      const params = {
        records: [record]
      };

      const response = await apperClient.updateRecord("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update application status ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating application status:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating application status:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, applicationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map UI field names to database field names - only Updateable fields
      const record = {
        Id: parseInt(id),
        status_c: applicationData.status,
        notes_c: applicationData.notes,
        interview_c: applicationData.interview ? JSON.stringify(applicationData.interview) : null
      };

      const params = {
        records: [record]
      };

      const response = await apperClient.updateRecord("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update application ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating application:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating application:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete application ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting application:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting application:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async checkApplication(jobId, candidateId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } }
        ],
        where: [
          {
            FieldName: "jobId_c",
            Operator: "EqualTo",
            Values: [parseInt(jobId)]
          },
          {
            FieldName: "candidateId_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error("Error checking application:", error.message);
      return null;
    }
  },

  async scheduleInterview(applicationId, interviewData) {
    try {
      const interview = {
        date: interviewData.date,
        time: interviewData.time,
        interviewer: interviewData.interviewer,
        type: interviewData.type,
        notes: interviewData.notes || ''
      };

      return await this.update(applicationId, {
        interview: interview,
        status: 'interview_scheduled'
      });
    } catch (error) {
      throw error;
    }
  },

  async updateInterview(applicationId, interviewData) {
    try {
      return await this.update(applicationId, {
        interview: interviewData
      });
    } catch (error) {
      throw error;
    }
  },

  async getUpcomingInterviews() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { 
            field: { Name: "jobId_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { Name: "candidateId_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: ["interview_scheduled"]
          }
        ],
        orderBy: [
          { fieldName: "appliedAt_c", sorttype: "ASC" }
        ]
      };

      const response = await apperClient.fetchRecords("application_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Filter upcoming interviews on client side since we have the data
      const now = new Date();
      const upcomingInterviews = (response.data || [])
        .filter(app => {
          if (!app.interview_c) return false;
          try {
            const interview = typeof app.interview_c === 'string' ? JSON.parse(app.interview_c) : app.interview_c;
            const interviewDateTime = new Date(`${interview.date}T${interview.time}`);
            return interviewDateTime >= now;
          } catch (e) {
            return false;
          }
        })
        .sort((a, b) => {
          try {
            const interviewA = typeof a.interview_c === 'string' ? JSON.parse(a.interview_c) : a.interview_c;
            const interviewB = typeof b.interview_c === 'string' ? JSON.parse(b.interview_c) : b.interview_c;
            const dateA = new Date(`${interviewA.date}T${interviewA.time}`);
            const dateB = new Date(`${interviewB.date}T${interviewB.time}`);
            return dateA - dateB;
          } catch (e) {
            return 0;
          }
        });

      return upcomingInterviews;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching upcoming interviews:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching upcoming interviews:", error.message);
        throw new Error(error.message);
      }
    }
  }
};