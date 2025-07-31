export const noteService = {
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
          { field: { Name: "entityType_c" } },
          { field: { Name: "entityId_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "content_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "updatedAt_c" } }
        ],
        orderBy: [
          { fieldName: "createdAt_c", sorttype: "DESC" }
        ],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords("note_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching notes:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching notes:", error.message);
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
          { field: { Name: "entityType_c" } },
          { field: { Name: "entityId_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "content_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "updatedAt_c" } }
        ]
      };

      const response = await apperClient.getRecordById("note_c", parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching note with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching note with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async getByEntity(entityType, entityId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "entityType_c" } },
          { field: { Name: "entityId_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "content_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "updatedAt_c" } }
        ],
        where: [
          {
            FieldName: "entityType_c",
            Operator: "EqualTo",
            Values: [entityType]
          },
          {
            FieldName: "entityId_c",
            Operator: "EqualTo",
            Values: [parseInt(entityId)]
          }
        ],
        orderBy: [
          { fieldName: "createdAt_c", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords("note_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching notes by entity:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching notes by entity:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(noteData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const now = new Date().toISOString();
      
      // Map UI field names to database field names - only Updateable fields
      const record = {
        Name: `${noteData.category} - ${noteData.entityType} ${noteData.entityId}`,
        entityType_c: noteData.entityType,
        entityId_c: parseInt(noteData.entityId),
        category_c: noteData.category,
        content_c: noteData.content?.trim(),
        createdAt_c: now,
        updatedAt_c: now
      };

      const params = {
        records: [record]
      };

      const response = await apperClient.createRecord("note_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create note ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating note:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating note:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, noteData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map UI field names to database field names - only Updateable fields
      const record = {
        Id: parseInt(id),
        category_c: noteData.category,
        content_c: noteData.content?.trim(),
        updatedAt_c: new Date().toISOString()
      };

      const params = {
        records: [record]
      };

      const response = await apperClient.updateRecord("note_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update note ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error updating note:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating note:", error.message);
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

      const response = await apperClient.deleteRecord("note_c", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete note ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting note:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting note:", error.message);
        throw new Error(error.message);
      }
    }
  },

  // Helper method to check if note can be edited (within 24 hours)
  canEdit(note) {
    try {
      const noteTime = new Date(note.createdAt_c);
      const now = new Date();
      const hoursDiff = (now - noteTime) / (1000 * 60 * 60);
      return hoursDiff <= 24;
    } catch (e) {
      return false;
    }
  }
};