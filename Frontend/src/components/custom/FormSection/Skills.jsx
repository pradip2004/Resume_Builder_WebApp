import React, { useContext, useState, useEffect } from 'react'
import { ResumeContextInfo } from '@/context/ResumeContextInfo';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Plus, Trash2 } from 'lucide-react';
import GlobalApi from '@/service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Skills = () => {
      const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo);
      const [loading, setLoading] = useState(false);
      const params = useParams();
      const [skillsList, setSkillsList] = useState([]);

      useEffect(() => {
            if (resumeInfo?.skills?.length > 0) {
                  setSkillsList(resumeInfo.skills);
            }
      }, [resumeInfo]);

      const addNewCategory = () => {
            setSkillsList([...skillsList, { category: '', items: [] }]);
      };

      const updateCategory = (index, field, value) => {
            const updatedSkills = [...skillsList];
            updatedSkills[index] = {
                  ...updatedSkills[index],
                  [field]: value
            };
            setSkillsList(updatedSkills);
            setResumeInfo({
                  ...resumeInfo,
                  skills: updatedSkills
            });
      };

      const addSkillItem = (categoryIndex) => {
            const updatedSkills = [...skillsList];
            updatedSkills[categoryIndex].items.push('');
            setSkillsList(updatedSkills);
            setResumeInfo({
                  ...resumeInfo,
                  skills: updatedSkills
            });
      };

      const updateSkillItem = (categoryIndex, itemIndex, value) => {
            const updatedSkills = [...skillsList];
            updatedSkills[categoryIndex].items[itemIndex] = value;
            setSkillsList(updatedSkills);
            setResumeInfo({
                  ...resumeInfo,
                  skills: updatedSkills
            });
      };

      const removeCategory = (index) => {
            const updatedSkills = skillsList.filter((_, i) => i !== index);
            setSkillsList(updatedSkills);
            setResumeInfo({
                  ...resumeInfo,
                  skills: updatedSkills
            });
      };

      const removeSkillItem = (categoryIndex, itemIndex) => {
            const updatedSkills = [...skillsList];
            updatedSkills[categoryIndex].items = updatedSkills[categoryIndex].items.filter((_, i) => i !== itemIndex);
            setSkillsList(updatedSkills);
            setResumeInfo({
                  ...resumeInfo,
                  skills: updatedSkills
            });
      };

      const onSave = () => {
            setLoading(true);
            
            // Validate that all categories have at least one item
            const isValid = skillsList.every(category => 
                  category.category.trim() !== '' && 
                  category.items.length > 0 && 
                  category.items.every(item => item.trim() !== '')
            );

            if (!isValid) {
                  setLoading(false);
                  toast('Please fill in all category names and add at least one skill to each category');
                  return;
            }

            const data = {
                  data: {
                        skills: skillsList
                  }
            };

            GlobalApi.updateResumeDetail(params.resumeId, data).then(resp => {
                  console.log(resp);
                  setLoading(false);
                  toast('Skills updated successfully!');
            }, (error) => {
                  setLoading(false);
                  toast('Server Error, Please try again!');
            });
      }

      return (
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 dark:shadow-[0_0_10px_rgba(144,238,144,0.2)] dark:shadow-[0_0_30px_rgba(144,238,144,0.1)]'>
                  <div className="flex justify-between items-center mb-5">
                        <div>
                              <h2 className='font-bold text-lg'>Skills</h2>
                              <p>Add Your skills details</p>
                        </div>
                        <div className="flex gap-2">
                              <Button onClick={addNewCategory} variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Category
                              </Button>
                              <Button disabled={loading} onClick={onSave} variant="default">
                                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                              </Button>
                        </div>
                  </div>

                  <div className="space-y-6">
                        <div className="space-y-4">
                              {skillsList.map((category, categoryIndex) => (
                                    <div key={categoryIndex} className="space-y-2 p-4 border rounded-lg">
                                          <div className="flex justify-between items-center">
                                                <input
                                                      type="text"
                                                      value={category.category}
                                                      onChange={(e) => updateCategory(categoryIndex, 'category', e.target.value)}
                                                      placeholder="Category name"
                                                      className="text-sm font-medium border-b border-gray-300 focus:outline-none focus:border-primary dark:text-white dark:bg-transparent"
                                                      required
                                                />
                                                <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={() => removeCategory(categoryIndex)}
                                                      className="text-red-500 hover:text-red-700"
                                                >
                                                      <Trash2 className="h-4 w-4" />
                                                </Button>
                                          </div>

                                          <div className="space-y-2">
                                                {category.items.map((item, itemIndex) => (
                                                      <div key={itemIndex} className="flex items-center gap-2">
                                                            <input
                                                                  type="text"
                                                                  value={item}
                                                                  onChange={(e) => updateSkillItem(categoryIndex, itemIndex, e.target.value)}
                                                                  placeholder="Add skill"
                                                                  className="text-sm border rounded px-2 py-1 flex-1 dark:text-white dark:bg-transparent"
                                                                  required
                                                            />
                                                            <Button
                                                                  variant="ghost"
                                                                  size="sm"
                                                                  onClick={() => removeSkillItem(categoryIndex, itemIndex)}
                                                                  className="text-red-500 hover:text-red-700"
                                                            >
                                                                  <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                      </div>
                                                ))}
                                                <Button
                                                      variant="outline"
                                                      size="sm"
                                                      onClick={() => addSkillItem(categoryIndex)}
                                                      className="w-full"
                                                >
                                                      <Plus className="h-4 w-4 mr-2" />
                                                      Add Skill
                                                </Button>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      )
}

export default Skills